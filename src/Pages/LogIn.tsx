import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";

type Props = {
    signIn: (data: any) =>  void
}

export function LogIn ({signIn}: Props) {
    return (
        <div>
            <SignInPage signIn={signIn } />
        </div>
    )
}