import { useState } from 'react'
import Select from './components/SelectComponent/Select'

function App() {
  const [selected, setSelected] = useState<{ id: number, name: string }[]>([])

  return (
    <div>
      <Select value={selected} onChange={setSelected} apiUrl='http://localhost:3000/api/items' placeholder='Placeholder' />
    </div>
  )
}

export default App
