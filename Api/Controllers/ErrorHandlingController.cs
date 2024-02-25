using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class ErrorHandlingController : BaseApiController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFoundRequest()
        {
            return NotFound();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new InvalidOperationException("This is a server error");
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails {Title = "This is a bad request"});
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorizedRequest()
        {
            return Unauthorized("You are not authorized");
        }

        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            return ValidationProblem("This is a validation problem");
        }
    }
}