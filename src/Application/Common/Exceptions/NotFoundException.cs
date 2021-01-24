using System;
using Application.Interfaces;

namespace Application.Common.Exceptions
{
    public class NotFoundException : Exception, IUserMessageError
    {
        public NotFoundException(object id) : base($"Object with id='{id}' not found")
        {
        }
    }
}
