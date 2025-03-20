const SharedInput = ({form, setForm, type, name, id, placeholder, label}) => {

  return (
    <div className="w-full md:w-[80%]">
      <label htmlFor={name} className="text-[15px] text-text font-[400]">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={form.name}
        onChange={(e) => setForm({...form, name: e.target.value})}
        placeholder={placeholder}
        className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-primary transition-colors duration-300"
        required
      />
    </div>
  );
};

export default SharedInput;
