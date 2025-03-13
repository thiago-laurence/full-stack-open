type Props = {
  errorMessage: string
}

const Notify = ({ errorMessage }: Props) => {
    if ( errorMessage === '' ) {
      return null
    }

    return (
      <div style={{ color: 'red' }}>
        { errorMessage }
      </div>
    )
}

export default Notify;