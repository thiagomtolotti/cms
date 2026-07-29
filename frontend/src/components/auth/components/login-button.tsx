import { Button } from "@/components/ui/button";
import { useKeycloak } from "@react-keycloak/web";

import { UserRound } from "lucide-react";

import type { ButtonProps } from "@base-ui/react/button";

export default function LoginButton() {
  const { keycloak, initialized } = useKeycloak();

  type AuthButtonVariants = "login" | "logout" | "loading";

  const variant: AuthButtonVariants = (() => {
    if (!initialized) return "loading";

    if (keycloak?.authenticated) return "logout";

    return "login";
  })();

  const buttonProps: Record<AuthButtonVariants, Partial<ButtonProps>> = {
    login: LoginButton.Login({ onClick: () => keycloak?.login() }),
    logout: LoginButton.Logout({
      onClick: () =>
        keycloak?.logout({
          redirectUri: window.location.origin,
        }),
    }),
    loading: LoginButton.Loading({ disabled: true }),
  };

  return <Button variant="ghost" {...buttonProps[variant]} />;
}

LoginButton.Login = (props: Partial<ButtonProps>): Partial<ButtonProps> => ({
  children: (
    <>
      <UserRound />
      Login
    </>
  ),
  ...props,
});

LoginButton.Logout = (props: Partial<ButtonProps>): Partial<ButtonProps> => ({
  children: (
    <>
      <UserRound />
      Logout
    </>
  ),
  ...props,
});

LoginButton.Loading = (props: Partial<ButtonProps>): Partial<ButtonProps> => ({
  children: (
    <>
      <UserRound />
      Carregando...
    </>
  ),
  ...props,
});
