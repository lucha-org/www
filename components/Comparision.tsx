import { Table } from "@mantine/core";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import { SuperWrestler } from "types/app";

interface ComparisionProps {
  wrestlers: SuperWrestler[];
}

const Comparision = ({ wrestlers }: ComparisionProps) => {
  const headers = useMemo(
    () => wrestlers.map((wrestler) => wrestler.slug),
    [wrestlers]
  );

  const rows = useMemo(() => {
    const features = [
      ...Object.keys(wrestlers[0]["features"]),
      ...Object.keys(wrestlers[1]["features"]),
    ];

    const rows = features
      .filter((feat, index) => features.indexOf(feat) !== index)
      .map((feat) => [
        feat,
        wrestlers[0]["features"][feat],
        wrestlers[1]["features"][feat],
      ]);

    return rows;
  }, [wrestlers]);

  return (
    <Table sx={{ margin: "3rem 0" }}>
      <thead>
        <tr>
          <th> </th>
          {headers.map((header, index) => (
            <th
              key={`header-${index}`}
              style={{ textTransform: "uppercase", backgroundColor: "" }}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => {
          return (
            <tr key={`row-${index}`}>
              {row.map((data, index) => (
                <td key={`data-${index}`}>
                  {index === 0 ? (
                    data
                  ) : data ? (
                    <CheckCircledIcon color="green" />
                  ) : (
                    <CrossCircledIcon color="red" />
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Comparision;
