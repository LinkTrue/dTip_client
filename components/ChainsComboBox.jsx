import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Select from "react-select";

const ChainsComboBox = forwardRef(({ onSelect }, ref) => {
  const [icons, setIcons] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const importAllIcons = () => {
      const iconsContext = require.context("/public/icons/chains", false, /\.svg$/);
      const iconFiles = iconsContext.keys().map((file) => {
        const fileName = file.replace("./", "");
        return {
          label: fileName.replace(".svg", ""),
          value: `/icons/chains/${fileName}`,
        };
      });
      setIcons(iconFiles);
    };

    importAllIcons();
  }, []);

  const handleChange = (option) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  const clearSelection = () => {
    setSelectedOption(null);
  };

  useImperativeHandle(ref, () => ({
    clearSelection,
  }));

  return (
    <div>
      <Select
        value={selectedOption}
        options={icons.filter((icon) =>
          icon.label.toLowerCase().includes(search.toLowerCase())
        )}
        onInputChange={(inputValue) => setSearch(inputValue)}
        onChange={handleChange}
        getOptionLabel={(option) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={option.value}
              alt={option.label}
              style={{ width: 20, marginRight: 10 }}
            />
            {option.label}
          </div>
        )}
        placeholder="Search the Native coin name..."
        isClearable
      />
    </div>
  );
});

export default ChainsComboBox;
