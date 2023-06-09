import Content from './components/Content'
import Header from './components/Header'
import Total from './components/Total'
import Part from './components/Part'

interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartBasic extends CoursePartBase {
  description: string
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: 'group'
}

interface CoursePartBackground extends CoursePartBase {
  description: string
  backgroundMaterial: string
  kind: 'background'
}

interface CoursePartSpecial extends CoursePartBase {
  description: string
  requirements: string[]
  kind: 'special'
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial

const App = () => {
  const courseName = 'Half Stack application development'

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
    },
  ]
  const total = courseParts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  )

    
  return (
    <div>
      <Header name={courseName} />
      {courseParts.map((item, index) => (
        <div key={index}>
          <Content item={item} />
          <Part item={item} />
        </div>
      ))}

      <Total total={total} />
    </div>
  )
 
    
}

export default App
