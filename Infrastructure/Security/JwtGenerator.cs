using Application.Interfaces;
using Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Security
{
    public class JwtGenerator : IJwtGenerator
    {
        public string CreateToken(AppUser user)
        {
            throw new NotImplementedException();
        }
    }
}
