using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivityController : BaseController
    {
        //private readonly IMediator _mediator;

        //public ActivityController(IMediator mediator)
        //{
        //    _mediator = mediator;
        //}
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<ActivityDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }


        [HttpGet("{Id}")]
        public async Task<ActionResult<ActivityDto>> Details(Guid Id)
        {
            return await Mediator.Send(new Details.Query { Id = Id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody] Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{Id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Edit(Guid Id, [FromBody] Edit.Command command)
        {
            command.Id = Id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult<Unit>> Delete(Guid Id)
        {
            return await Mediator.Send(new Delete.Command { Id = Id });
        }

        [HttpPost("{Id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid Id)
        {
            return await Mediator.Send(new Attend.Command { Id = Id });
        }

        [HttpDelete("{Id}/attend")]
        public async Task<ActionResult<Unit>> UnAttend(Guid Id)
        {
            return await Mediator.Send(new UnAttend.Command { Id = Id });
        }

    }
}