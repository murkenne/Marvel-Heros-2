import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main>
        <div>
        <h1>404 Error Not Found</h1>
          <p>Having trouble locating this page please try again....</p>
          <p>You can always go back to the <Link to="/">homepage</Link>.
          </p>
        </div>
    </main>
  )
}