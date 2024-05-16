import { useEffect, useState } from "react";

const HeaderDashboard: React.FC = () => {
  const [username , setUsername] = useState('')
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setUsername(user);
        }
    }, []);
  return (
    <div>
        <h1>Welcome, {username}</h1>
    </div>
  );
};

export default HeaderDashboard;
