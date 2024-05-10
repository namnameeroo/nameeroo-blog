interface Props {
  children: string;
}
const CodeBox = ({children}: Props) => {
  const codes = children.split("\n");
  return (
    <div className="mockup-code">
      {codes?.map((code, idx) => {
        return (
          <pre data-prefix={idx + 1}>
            <code>{code}</code>
          </pre>
        );
      })}
    </div>
  );
};
