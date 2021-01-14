using System;

namespace Application.Common.Exceptions
{
    public class ObjectNotFoundException : Exception
    {
        public ObjectNotFoundException(object id) : base($"Object with id='{id}' is missing")
        {
        }
    }
}
