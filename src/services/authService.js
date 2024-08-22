// This is a mock service. In a real application, these operations would interact with a backend server.
export const login = (username, password) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return { token: btoa(JSON.stringify({ id: user.id, username: user.username, role: user.role })) };
  }
  throw new Error('Invalid username or password');
};

export const register = (username, password) => {
  if (users.find(u => u.username === username)) {
    throw new Error('Username already exists');
  }
  const newUser = { id: users.length + 1, username, password, role: 'user' };
  users.push(newUser);
  return { token: btoa(JSON.stringify({ id: newUser.id, username: newUser.username, role: newUser.role })) };
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return JSON.parse(atob(token));
  }
  return null;
};