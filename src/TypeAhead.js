import { useEffect, useState } from "react";

export default function TypeAdhead() {
  // https://jsonplaceholder.typicode.com/users
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [cache, setCache] = useState({});

  const getAllUsers = async () => {
    if (cache[query]) {
      console.log("From cache ", query);
      return cache[query];
    }
    // console.log(query);
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    // console.log(data);
    let filteredUser = data.filter((u) => u.username.includes(query));
    let updatedCache = { ...cache, [query]: filteredUser };
    // console.log(filteredUser);
    // console.log(updatedCache);
    setCache(updatedCache);
    setUsers(filteredUser);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      getAllUsers();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="suggestions-container">
        {users.map((user) => {
          return (
            <div className="suggestion" onClick={() => setQuery(user.username)}>
              {user.username}
            </div>
          );
        })}
      </div>
    </>
  );
}
