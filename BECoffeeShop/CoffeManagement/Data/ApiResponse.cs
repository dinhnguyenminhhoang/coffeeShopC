namespace CoffeManagement.Data
{

    public class SuccessResponse<T>
    {
        public bool Success { get; } = true;
        public string Message { get; set; } = string.Empty;
        public T? ResultData { get; set; }
    }

    public class ErrorResponse
    {
        public bool Success { get; } = false;
        public string Message { get; set; } = string.Empty;
    }
}
