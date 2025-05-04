// Simulated user storage
interface SimulatedUser {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: "applicant" | "hirer"
  password: string
}

// Initialize with some test users
const testUsers: SimulatedUser[] = [
  {
    id: '1',
    email: 'applicant@test.com',
    firstName: 'Test',
    lastName: 'Applicant',
    userType: 'applicant',
    password: 'test123'
  },
  {
    id: '2',
    email: 'hirer@test.com',
    firstName: 'Test',
    lastName: 'Hirer',
    userType: 'hirer',
    password: 'test123'
  }
];

let users: SimulatedUser[] = [...testUsers];

// Generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15)

export const simulatedAuth = {
  // Sign up a new user
  signUp: async (email: string, password: string, userData: any) => {
    // Check if user already exists
    if (users.find((user) => user.email === email)) {
      return {
        error: { message: "User with this email already exists" },
        data: null,
      }
    }

    // Create new user
    const newUser = {
      id: generateId(),
      email,
      password,
      firstName: userData.first_name,
      lastName: userData.last_name,
      userType: userData.user_type as "applicant" | "hirer",
    }

    users.push(newUser)

    return {
      error: null,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          user_metadata: {
            first_name: newUser.firstName,
            last_name: newUser.lastName,
            user_type: newUser.userType,
          },
        },
      },
    }
  },

  // Sign in a user
  signIn: async (email: string, password: string) => {
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return {
        error: { message: "Invalid login credentials" },
        data: null,
      }
    }

    return {
      error: null,
      data: {
        user: {
          id: user.id,
          email: user.email,
          user_metadata: {
            first_name: user.firstName,
            last_name: user.lastName,
            user_type: user.userType,
          },
        },
      },
    }
  },

  // Sign in with OAuth (simulated)
  signInWithOAuth: async (provider: string) => {
    return {
      error: null,
      data: { provider },
    }
  },

  // Get current session (simulated)
  getSession: async () => {
    // This would normally check for a valid session
    return {
      error: null,
      data: { session: null },
    }
  },

  // Sign out
  signOut: async () => {
    return {
      error: null,
      data: {},
    }
  },
}

// Simulated database operations
export const simulatedDb = {
  // Insert data into a "table"
  insert: async (table: string, data: any[]) => {
    return {
      error: null,
      data,
    }
  },

  // Select data from a "table"
  select: async (table: string, condition: any) => {
    // This is a simplified simulation
    return {
      error: null,
      data: [{ id: generateId(), ...condition }],
    }
  },

  // Update data in a "table"
  update: async (table: string, data: any) => {
    return {
      error: null,
      data,
    }
  },
}
