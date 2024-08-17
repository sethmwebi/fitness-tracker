import { useState } from 'react'
import * as Icon from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleModal = () => {
     isModalOpen?setIsModalOpen(false):setIsModalOpen(true)
  }
  return (
    <header>
        <div className="profile">
           <h3 className='profile-icon' onClick={handleModal}><Icon.Person/></h3>
           {
            isModalOpen?(<div className='profile-details'>
                <h3><Icon.Person/></h3>
                <h2>The name</h2>
                <p> <Icon.Mailbox/> Email@gmail.com</p>
                <button>Logout</button>
           </div>):''
           }

        </div>
        <nav>
            <ul>
            <Link to='/' className='link-list'> Dashboard</Link>
            <Link to='/goals' className='link-list'> Goals</Link>

            </ul>
        </nav>
    </header>
  )
}

export default Navbar