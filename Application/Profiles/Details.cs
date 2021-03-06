﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile>
        {
            public string UserName { get; set; }

        }

        public class Handler : IRequestHandler<Query, Profile>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                //handler logic
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.UserName);
                return new Profile
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Image = user.Photos.FirstOrDefault(x => x.IsMain == true)?.Url,
                    Photos = user.Photos,
                    Bio = user.Bio
                };
            }
        }
    }
}
