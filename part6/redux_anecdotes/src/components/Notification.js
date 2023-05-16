import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  console.log('notification', notification)
  return <div style={style}>{notification.notification}</div>
}

export default Notification
