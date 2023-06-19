import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodDTO } from 'models';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<FoodDTO[]>('/api/foods');
  }

  getOne(id: number) {
    return this.http.get<FoodDTO>('/api/foods/' + id);
  }

  create(food: FoodDTO) {
    return this.http.post<FoodDTO>('/api/foods', food);
  }

  update(food: FoodDTO) {
    return this.http.put<FoodDTO>('/api/foods', food);
  }

  delete(id: number) {
    return this.http.delete('/api/foods/' + id);
  }
}
