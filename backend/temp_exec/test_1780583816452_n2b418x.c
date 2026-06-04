#include <stdio.h>
#include <string.h>

int main()
{
    char text[1000]="";

    int choice;

    while(1)
    {
        printf("\n\n1.Enter Text");
        printf("\n2.Display Text");
        printf("\n3.Count Characters");
        printf("\n4.Clear Text");
        printf("\n5.Exit");

        printf("\nChoice: ");
        scanf("%d",&choice);

        getchar();

        switch(choice)
        {
            case 1:

                printf("Enter Text: ");
                fgets(text,1000,stdin);

                printf("Saved Successfully");
                break;

            case 2:

                printf("\nText:\n%s",text);
                break;

            case 3:

                printf("Characters = %d",
                       strlen(text)-1);
                break;

            case 4:

                strcpy(text,"");

                printf("Text Cleared");
                break;

            case 5:

                return 0;

            default:

                printf("Invalid Choice");
        }
    }
}