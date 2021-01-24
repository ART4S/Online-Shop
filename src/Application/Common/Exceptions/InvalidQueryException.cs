using System;
using Application.Interfaces;

namespace Application.Common.Exceptions
{
    public class InvalidQueryException : Exception, IUserMessageError
    {
        public InvalidQueryException(string message) : base(message)
        {
        }
    }
}
