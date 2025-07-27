const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return ( 
        <div className="h-full flex items-center justify-center bg-gradient-to-b from-gray-400 to-gray-900">
            {children}
        </div>
     );
}
 
export default AuthLayout;