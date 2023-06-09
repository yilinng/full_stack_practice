interface passErrorProps {
  passError: string
}

export default function Error(props: passErrorProps) {
  console.log(props.passError)

  return (
    <div className='error' style={{ color: 'red', fontWeight: '700' }}>
      {props.passError}
    </div>
  )
}
