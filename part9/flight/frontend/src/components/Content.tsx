export default function Content(props: {
  item: {
    name: string
    exerciseCount: number
  }
}) {
  // console.log('props', props.item)

  return (
    <div>
      <b>
        {props.item.name}
        {props.item.exerciseCount}
      </b>
    </div>
  )
}
