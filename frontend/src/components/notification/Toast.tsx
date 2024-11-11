export const Toast = ({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) => {
  return (
    <div className="toast toast-top toast-center">
      {error && (
        <div className="alert alert-error shadow-lg">
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="alert alert-success shadow-lg">
          <span>{success}</span>
        </div>
      )}
    </div>
  );
};
