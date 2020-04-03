using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm]Add.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult<Unit>> Delete(string Id)
        {
            return await Mediator.Send(new Delete.Command { Id = Id });
        }
        [HttpPost("{Id}/SetMain")]
        public async Task<ActionResult<Unit>> SetMain(string Id)
        {
            return await Mediator.Send(new SetMain.Command { Id = Id });
        }
    }
}