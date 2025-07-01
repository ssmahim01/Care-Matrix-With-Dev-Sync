{/* <div
  key={department?._id}
  className="w-full h-full grid place-content-stretch shadow-[0px_4px_10px_#0E82FD50] hover:shadow-none z-0 bg-white rounded relative cursor-pointer group 
            before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] 
            before:w-full before:h-full before:rounded before:bg-[#0E82FD20] before:transition-all before:duration-500 before:z-[-1] 
            after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] 
            after:rounded after:bg-[#0E82FD10] after:z-[-2] after:transition-all after:duration-500"
>

  <img
    src={department?.image}
    alt="animated_card"
    className="w-full h-[250px] rounded-t object-cover"
  />


  <div className="p-[18px] pt-2.5 bg-white rounded-b">
    <h3 className="text-[1.5rem] font-bold text-[#272727] tracking-wide">
      {department?.title}
    </h3>
    <p className="text-[1rem] mt-1 font-[400] text-gray-600">
      {department?.description}
    </p>
    <Link to={`/departments/${department?.title}`} state={department?.title}>
      <UnderLineButton text={"Read More..."} />
    </Link>
  </div>
</div>; */}
