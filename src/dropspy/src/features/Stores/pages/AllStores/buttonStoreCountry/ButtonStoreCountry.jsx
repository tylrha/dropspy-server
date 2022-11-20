import ReactCountryFlag from "react-country-flag"

const ButtonStoreCountry = ({value}) => {

  const { storeCountry } = value // isSpying,

  return (
    <>
      {storeCountry === 'brasil' ? (
        <div className="cellAction">
          <ReactCountryFlag countryCode="BR" svg />

        </div>
      ) : (
        <div className="cellAction">
          <ReactCountryFlag countryCode="US" svg />
        </div>
      )}
    </>
  )

}

export { ButtonStoreCountry }
