import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link, useLocation} from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaUser } from 'react-icons/fa'
import React from 'react'
import './app.css'
export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2 p-2'>
    <Link to="/" className='logo self-center pl-4 whitespace-nowrap flex text-xl sm:text-2xl font-semibold dark:text-white'>
    Edu
  <span className='px-1 ml-1 bg-blue-500 rounded-lg text-white'>
    Paila
  </span>

    </Link>
    <form>
      <TextInput
      type='text'
      placeholder='search'
      rightIcon={AiOutlineSearch}
      className='bar hidden lg:inline'
      />
    </form>
    <Button className='btn w-36 h-10 lg:hidden' color='gray' pill>
<AiOutlineSearch/>
    </Button>
    <div className='flex gap-2 md:order-2'>
      <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
        <FaMoon/>
      </Button>
      <Link to='/signin'>
      <Button  className='w-12 h-10' color='gray' pill outline gradientDuoTone='purpleToBlue'>
      <FaUser />
      </Button>
      </Link>
    </div>
      <Navbar.Toggle/>
      <Navbar.Collapse>
<Navbar.Link active={path === "/"} as={'div'}>
<Link to='/'>Home</Link>
</Navbar.Link>

<Navbar.Link active={path === "/about"} as={'div'}>
<Link to='/about'>About</Link>
</Navbar.Link>

<Navbar.Link active={path === "/books"} as={'div'}>
<Link to='/books'>Books</Link>
</Navbar.Link>



      </Navbar.Collapse>
    </Navbar>
  )
}
