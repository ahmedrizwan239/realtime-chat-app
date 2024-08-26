export const login = (email, password) => {
    // Fetch data from API using POST method
    fetch('http://localhost:5000/users/login', {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json',
       },
       body: JSON.stringify({ email, password }),
    })
    .then(response => {
       if (response.ok) {
      setError('');
      toast({
        title: "Login successful.",
        description: `Welcome, ${storedName}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      setError('Invalid credentials');
      toast({
        title: "Login failed.",
        description: "Invalid credentials.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
       return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error fetching data:', error));
 };
 

