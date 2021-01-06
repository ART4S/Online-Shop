using System;

namespace Web.Exceptions
{
    public class NotAuthenticatedException : Exception
    {
        public NotAuthenticatedException() : base("User is not authenticated")
        {
        }
    }
}
