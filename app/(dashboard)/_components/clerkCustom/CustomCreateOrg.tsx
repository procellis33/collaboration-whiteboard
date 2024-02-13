import { CreateOrganization } from "@clerk/nextjs";

export const CustomCreateOrg = () => {
  return (
    <CreateOrganization
      appearance={{
        elements: {
          rootBox: {
            display: "flex",
            justifyContent: "center",
            width: "100%",
          },
          card: {
            width: "unset",
            maxWidth: "unset",
            flex: 1,
            backgroundColor: "transparent",
            boxShadow: "unset",
          },
        },
      }}
    />
  );
};
