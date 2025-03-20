import UsersTable from "@/components/Table/UsersTable";

const ManageUsers = () => {
  const users = true;
  return (
    <div className="max-w-screen-2xl">
      <h2 className="md:text-4xl text-2xl text-base-content font-bold mb-5">
        Manage Users
      </h2>

      {users ? (
        <UsersTable />
      ) : (
        <div className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
          <img
            src="https://i.ibb.co/cgfgxGH/Illustrations.png"
            alt="empty/image"
            className="w-full sm:w-[200px]"
          />

          <h1 className="text-[1.4rem] mt-6 font-[500] text-black">
            Result Not Found
          </h1>

          <p className="text-[0.9rem] text-gray-500">
            Whoops ... users information is not available for a moment
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
