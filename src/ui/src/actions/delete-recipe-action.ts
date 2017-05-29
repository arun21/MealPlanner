import { Injectable } from '@angular/core';
import { IAction } from './action';
import { UserDataService } from '../services/user-data-service';

export interface DeleteRecipeActionParams {
    id: string;
}

@Injectable()
export class DeleteRecipeAction implements IAction<DeleteRecipeActionParams> {

    constructor(private userData: UserDataService) {
    }

    async execute(params: DeleteRecipeActionParams): Promise<void> {
        
        if(!params || !params.id)
            throw 'Invalid Delete Recipe Request: ' + JSON.stringify(params);

        console.debug('[DeleteRecipeAction::execute] ', params);
        console.info('Deleting recipe '+ params.id);

        return this.userData.getRef(`/recipes/${params.id}`)
                .remove()
                .then(() => console.log('Successfully deleted recipe'))
                .catch((error) => console.error('Error deleting recipe: ' + JSON.stringify(error)));

    }

}
