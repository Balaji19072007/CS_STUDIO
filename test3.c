
#include <stdio.h>

int main()
{
    float a,b;
    int choice;

    printf("Enter First Number: ");
    scanf("%f",&a);

    printf("Enter Second Number: ");
    scanf("%f",&b);

    printf("\n1.Add");
    printf("\n2.Subtract");
    printf("\n3.Multiply");
    printf("\n4.Divide");

    printf("\nChoice: ");
    scanf("%d",&choice);

    switch(choice)
    {
        case 1:
            printf("Result = %.2f",a+b);
            break;

        case 2:
            printf("Result = %.2f",a-b);
            break;

        case 3:
            printf("Result = %.2f",a*b);
            break;

        case 4:
            if(b!=0)
                printf("Result = %.2f",a/b);
            else
                printf("Cannot divide by zero");
            break;

        default:
            printf("Invalid Choice");
    }

    return 0;
}
