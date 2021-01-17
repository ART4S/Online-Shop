using System;

namespace Application.Common.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException(object id) : base($"Object with id='{id}' not found")
        {
        }
    }
}
