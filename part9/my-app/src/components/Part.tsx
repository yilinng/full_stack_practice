export default function Part(props: {
  item: {
    name: string
    exerciseCount: number
    kind: string
    description?: string
    groupProjectCount?: number
    requirements?: string[]
    backgroundMaterial?: string
  }
}) {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  switch (props.item.kind) {
    case 'basic':
      console.log('basic', props.item)
      return <div>{props.item.description}</div>

    case 'group':
      console.log('group', props.item)
      return <div>{props.item.groupProjectCount}</div>

    case 'background':
      console.log('background', props.item)
      return (
        <div>
          <p>{props.item.description}</p> <p>{props.item.backgroundMaterial}</p>
        </div>
      )

    case 'special':
      console.log('special', props.item)
      return (
        <div>
          <p>{props.item.description}</p>
          require skill:
          {props.item.requirements?.map((requirement, idx) => (
            <span key={idx}> {requirement}</span>
          ))}
        </div>
      )

    default:
      return null
  }
}
