import { useSelect } from "@refinedev/antd";
import { useState } from "react";
import { Select as AntdSelect, SelectProps } from "antd";
import { Colors } from "@/config";
import { Text } from "./text";
import { Option } from "@/types";

type Props<T> = {
  label: string;
  required?: boolean;
  resource: string;
  onMapData?: (item: T) => Option;
} & SelectProps;

export const SelectFromRemote = <T,>({
  resource,
  label,
  required = true,
  onMapData = (item: T) => {
    const typedItem = item as Option;
    return { id: typedItem.id, name: typedItem.name };
  },
  ...rest
}: Props<T>) => {
  const [focused, setFocused] = useState(false);
  const { selectProps, query } = useSelect({
    optionLabel: "name",
    optionValue: "id",
    resource,
  });

  const items = Array.isArray(query.data?.data?.results)
    ? query.data.data.results.map(onMapData)
    : [];

  console.log(items);

  return (
    <div
      style={{
        border: focused
          ? `2px solid ${Colors.primary}`
          : `2px solid ${Colors.white}`,
        backgroundColor: Colors.light,
        borderRadius: 8,
        padding: "4px 8px",
        transition: "border 0.2s",
      }}
    >
      <Text
        style={{
          color: Colors.medium,
        }}
        size="xs"
      >
        {label}
        {required && (
          <Text
            size="xs"
            style={{
              color: Colors.danger,
            }}
          >
            {" "}
            *
          </Text>
        )}
      </Text>
      <AntdSelect
        variant="borderless"
        size="small"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        options={items}
        {...selectProps}
        {...rest}
      />
    </div>
  );
};
