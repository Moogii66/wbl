import classNames from "classnames";

export default function EmptyView({
  className,
  label,
}: {
  className?: string;
  label: string;
}) {
  return (
    <div
      className={classNames(
        className,
        "text-text-secondary text-18 font-light mt-6 flex justify-center"
      )}
    >
      {label}
    </div>
  );
}
