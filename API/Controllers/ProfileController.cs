using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProfileController : BaseController
    {
        [HttpGet("{UserName}")]
        public async Task<ActionResult<Profile>> Get(string UserName)
        {
            return await Mediator.Send(new Details.Query { UserName = UserName });
        }
    }
}