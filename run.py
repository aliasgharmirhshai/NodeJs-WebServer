import os
import sys

def CheackPort(port):
    try:
        check = os.popen("sudo netstat -tulpn | grep node | awk '{ print $4 }' | cut -b 4-",)
        ports = []

        for line in check:
            ports.append(line.strip())

        if port in ports:    
            status = os.popen(f"sudo netstat -tulpn | grep node | grep {port}",)
            print(f" {port} Is Blocked\n  STATUS : {status.read()}")
            
            answer = input("\n Do You Have Clear This Port? (y or n) : ")
            if answer == 'y':
                os.system(f"sudo kill -9 $(sudo lsof -t -i:{port})")
            else:
                print("GoodBy /:")
                exit()
                
        os.system("clear")
        print("Port Is Clean")
        os.system(f"sudo node Server.js {port}")
  
    except:
        print("Somthing Wrong")

if __name__ == '__main__':
    try:
        port = sys.argv[1]

        if os.name == 'nt':
            pass
        else:
            CheackPort(port)
    except IndexError:
        print(" Please Enter Port\n python3 run.py [Your Port]")
        