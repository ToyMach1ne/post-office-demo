interface CountryProps {
  countryName: string;
  callingCode: string;
  flagEmoji: string;
  countryCode: string;
  handleClickCountry?: (
    code: string,
    flag: string,
    countryCode: string
  ) => void;
}

export const CountryItem = ({
  countryName,
  callingCode,
  flagEmoji,
  countryCode,
  handleClickCountry,
}: CountryProps) => {
  return (
    <li
      onClick={() =>
        handleClickCountry &&
        handleClickCountry(callingCode!, flagEmoji!, countryCode!)
      }
    >
      <span>
        <span className="flag-holder">{flagEmoji}</span>
        {countryName}
      </span>
      <span>+{callingCode}</span>
    </li>
  );
};
