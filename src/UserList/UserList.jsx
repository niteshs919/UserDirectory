import { NavLink } from "react-router-dom";
const UserList = (props) => {
  const { userData, userIdCountArray } = props;
  return (
    <div className="px-10 ">
      {userData?.map((val) => {
        const userPostCount = userIdCountArray?.filter(
          (post) => post.userId == val.id
        )[0]?.count;
        return (
          <>
            <NavLink to={`/userPosts/${val.id}`} key={val.id}>
              <div className="flex p-3 px-6 rounded-2xl justify-between h-12 w-full border border-current bg-sky-100 mb-4">
                <li className="flex">Name : {val.name}</li>
                <li className="flex">Posts : {userPostCount}</li>
              </div>
            </NavLink>
          </>
        );
      })}
    </div>
  );
};

export default UserList;
