export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body
        // Mock authentication
        if (username === 'admin' && password === 'password') {
            res.status(200).json({ token: 'mock_token_123' })
        } else {
            res.status(401).json({ message: 'Invalid credentials' })
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
