import React, {useState, useEffect, useRef} from 'react';
import FlashcardList from './FlashcardList';
import './app.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
  const [categories, setCategories] = useState([])
  const categoryEl = useRef

  useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then( res => {
      setCategories(res.data.trivia_categories)
      
    })
  }, [])

  useEffect(() => {
    axios
    .get('https://opentdb.com/api.php?amount=10')
    .then(res => {
     setFlashcards( res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a=>decodeString(a)),
           answer
          ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() -.5)
        }
      }))
    })
  } , [])

  function decodeString(str){
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }

  function handleSubmit(e){
    e.preventDefault()
  }
  return (
    <>
    <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryEl}>
        {categories.map(category => {
          return <option value={category.id} key={category.id}> {category.name} </option>
        })}

        </select>

      </div>
    </form>
    <div className="container">
    <FlashcardList flashcards = {flashcards} />
    </div>
    </>
  );
}

const SAMPLE_FLASHCARDS= [
  {
    id: 1,
    question: 'What is 2+2?',
    answer: '4',
    options :[
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: 'What is 1+2?',
    answer: '3',
    options :[
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 3,
    question: 'What is 2+3?',
    answer: '5',
    options :[
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 4,
    question: 'What is 1+3?',
    answer: '4',
    options :[
      '2',
      '3',
      '4',
      '5'
    ]
  }
]

export default App;
