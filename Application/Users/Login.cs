﻿using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly UserManager<AppUser> _userManager;


            public Handler(UserManager<AppUser> userManager,SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
            {
                _signInManager = signInManager;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                //handler logic
                var user = await _userManager.FindByEmailAsync(request.Email);
                if(user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }
                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password,false);

                if (result.Succeeded)
                {
                    //TODO:generate token
                    return new User {
                        DisplayName=user.DisplayName,
                        Token=_jwtGenerator.CreateToken(user),
                        UserName=user.UserName,
                        Image=""
                    };
                }
                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
