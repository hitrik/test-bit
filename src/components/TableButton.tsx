import React, {FC, PropsWithChildren} from "react";

export const TableButton: FC<PropsWithChildren & { onClick: (arg?: unknown) => void }> = ({ children, onClick }) => <button onClick={onClick} className="table-button">{children}</button>
