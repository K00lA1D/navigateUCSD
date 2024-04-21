const CommonButton = ({ btnText }) => {
  return (
    <button
      type="button"
      className="p-4 sm:p-5 rounded-lg w-fit capitalize bg-blue-gradient text-primary"
    >
      <a href="#" target="">
        {btnText}
      </a>
    </button>
  );
};

export default CommonButton;
