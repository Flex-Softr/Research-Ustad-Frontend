import ManageAllUser from "@/components/module/users/Allusers/AllUsers";

const ManageUser = async () => {

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold  mb-4">All Users</h2>
      <ManageAllUser/>
    </div>
  );
};

export default ManageUser;