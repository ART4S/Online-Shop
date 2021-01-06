using System;

namespace Application.Common.Exceptions
{
    public class InvalidQueryException : Exception
    {
        public InvalidQueryException(string message) : base(message)
        {
        }
    }
}
